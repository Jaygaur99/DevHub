import esbuild from 'esbuild-wasm';
import axios from 'axios';
import pathservice from 'path-browserify';
import localforage from 'localforage';

import { builtinModules } from './builtInModules';

const fileCache = localforage.createInstance({
    name: 'fileCache',
});

export const fileImportFetchPlugin = ({
    allFiles,
}: {
    allFiles: Record<string, { code: string }>;
}): esbuild.Plugin => {
    const fileTree = new Map(Object.entries(allFiles));
    const RESOLVE_EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js', '.css', '.json'];

    return {
        name: 'plugin',

        setup(build: esbuild.PluginBuild) {
            // intercept import path starting with http: and https:
            // pass path directly as it is a http path
            build.onResolve(
                { filter: /^https?:\/\// },
                (args: esbuild.OnResolveArgs) => {
                    return {
                        namespace: 'http-path',
                        path: args.path,
                    };
                },
            );

            build.onResolve(
                {
                    filter: /.*/,
                },
                (args: esbuild.OnResolveArgs) => {
                    if (args.kind === 'entry-point') {
                        return { path: '/' + args.path };
                    }

                    // check if modules are built in modules
                    // pass external as true  for built in modules
                    if (
                        builtinModules.find((iterator) => {
                            if (iterator === args.path) return true;
                            if (args.path.startsWith(`${iterator}/`))
                                return true;

                            return false;
                        })
                    ) {
                        return { external: true, path: args.path };
                    }

                    if (args.kind === 'import-statement') {
                        // intercept modules that are needed to be fetched
                        // eg -> import react from "react"
                        // pass path with cdnUrl and namespace
                        if (!args.path.match(/^\.+\//)) {
                            return {
                                namespace: 'http-request',
                                path: `https://unpkg.com/${args.path}`,
                            };
                        }

                        // intercept modules that are neeeded to be read from filePath
                        // eg -> import app from './App.js'
                        // get dirname via path modules and created path
                        const dirname = pathservice.dirname(args.importer);
                        const path = pathservice.join(dirname, args.path);

                        return {
                            path,
                        };
                    }

                    // recursivly call import for http-request to get production ready code from website
                    if (args.path.match(/^\.+\//)) {
                        return {
                            namespace: 'http-request',
                            path: new URL(
                                args.path,
                                `https://unpkg.com${args.resolveDir}/`,
                            ).href,
                        };
                    } else {
                        // call the other modules that are need to make production ready for fetched modules
                        try {
                            return {
                                namespace: 'http-request',
                                path: `https://unpkg.com/${args.path}`,
                            };
                        } catch (error) {
                            throw Error(`${args.path} Path not defined`);
                        }
                    }
                },
            );

            build.onLoad({ filter: /.*/ }, async (args: esbuild.OnLoadArgs) => {
                // cache files in user local
                const cacheResult =
                    await fileCache.getItem<esbuild.OnLoadResult>(args.path);
                if (cacheResult) {
                    return cacheResult;
                }

                // if path exists in folder structure
                // take the content from fileTree and content
                const haveRelativePath = fileTree.has(args.path);

                if (haveRelativePath || args.path[0] === '/') {
                    // if file tree has already extesnion assocaited
                    if (haveRelativePath) {
                        const ext = pathservice.extname(args.path);
                        const loader =
                            ext === '.ts'
                                ? 'ts'
                                : ext === '.tsx'
                                ? 'tsx'
                                : ext === '.js'
                                ? 'jsx'
                                : ext === '.jsx'
                                ? 'jsx'
                                : ext === '.html'
                                ? 'file'
                                : ext === '.css'
                                ? 'css'
                                : 'default';

                        return {
                            contents: fileTree.get(args.path)?.code,
                            loader,
                        };
                    }

                    // if no file extesnion is ascciated check for every extesnion
                    for (const ext of RESOLVE_EXTENSIONS) {
                        if (fileTree.has(String(args.path + ext))) {
                            const loader =
                                ext === '.ts'
                                    ? 'ts'
                                    : ext === '.tsx'
                                    ? 'tsx'
                                    : ext === '.js'
                                    ? 'jsx'
                                    : ext === '.jsx'
                                    ? 'jsx'
                                    : ext === '.css'
                                    ? 'css'
                                    : ext === '.json'
                                    ? 'json'
                                    : 'default';

                            return {
                                contents: fileTree.get(String(args.path + ext))
                                    ?.code,
                                loader,
                            };
                        }
                    }
                }

                // if path is doesnot exists folder structure get the module code from axios
                // pass on request.responseURL for production ready code via calling it recurivly
                try {
                    const { data, request } = await axios.get(args.path);

                    // cache user files
                    await fileCache.setItem(args.path, {
                        loader: 'jsx',
                        contents: data,
                        resolveDir: new URL('./', request.responseURL).pathname,
                    });

                    return {
                        loader: 'jsx',
                        contents: data,
                        resolveDir: new URL('./', request.responseURL).pathname,
                    };
                } catch (error) {
                    throw Error(`${args.path} Path not found`);
                }
            });
        },
    };
};
