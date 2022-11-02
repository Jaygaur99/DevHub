import { NotFoundTemplate } from 'Components';

const PageNotFound = () => {
    return (
        <NotFoundTemplate
            mainContent="Page Not Found"
            buttonText="Go To Home"
            buttonLink="/"
        />
    );
};

export default PageNotFound;
