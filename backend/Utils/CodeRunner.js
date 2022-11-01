const fs = require('fs');
const path = require('path');
const { PythonShell } = require('python-shell');
const uuid = require('uuid').v4;
const { exec } = require('child_process');

const dirCodes = path.join(__dirname, 'codes');

if (!fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes, { recursive: true });
}

const executePythonCode = async (code, input) => {
    const uniq = uuid();
    const fileName = `${uniq}.py`;
    const filePath = path.join(dirCodes, fileName);

    return new Promise(async (resolve) => {
        fs.writeFileSync(filePath, code);

        let options = {
            mode: 'text',
            pythonOptions: ['-u'],
            args: input
                ? input
                      .split('\n')
                      .map((num) => (Number(num) ? Number(num) : num))
                : [],
        };

        PythonShell.run(filePath, options, (error, result) => {
            if (error) {
                resolve(error.message);
            }

            resolve(result);
        });
    });
};

const executeCppCode = async (code, input) => {
    const uniq = uuid();
    const fileName = `${uniq}.cpp`;
    const filePath = path.join(dirCodes, fileName);
    const inputPath = path.join(dirCodes, `${uniq}.txt`);
    const outPath = path.join(dirCodes, `${uniq}.out`);

    return new Promise(async (resolve, reject) => {
        fs.writeFileSync(filePath, code);
        fs.writeFileSync(inputPath, input);

        exec(
            // `g++ "${filePath}" -o "${outPath}" && cd "${dirCodes}" && ./${uniq}.out < "${inputPath}"`,
            `gcc "${filePath}" -lstdc++ -o "${outPath}" && cd "${dirCodes}" && ./${uniq}.out < "${inputPath}"`,
            (error, stdout, stderr) => {
                if (stdout) {
                    resolve(stdout);
                }

                if (stderr) {
                    const errror = stderr.split(/(error: |error:)/);
                    resolve(errror[errror.length - 1]);
                }
            },
        );
    });
};

const executeJSCode = async (code, input) => {
    const uniq = uuid();
    const fileName = `${uniq}.js`;
    const filePath = path.join(dirCodes, fileName);
    const inputPath = path.join(dirCodes, `${uniq}.txt`);

    return new Promise(async (resolve, reject) => {
        fs.writeFileSync(filePath, code);
        fs.writeFileSync(inputPath, input);

        exec(`node "${filePath}" < "${inputPath}"`, (error, stdout, stderr) => {
            error && resolve(error.message);

            stdout && resolve(stdout);

            if (stderr) {
                const errror = stderr.split(/(error: |error:)/);
                resolve(errror[errror.length - 1]);
            }
        });
    });
};

exports.executePythonCode = executePythonCode;
exports.executeCppCode = executeCppCode;
exports.executeJSCode = executeJSCode;
