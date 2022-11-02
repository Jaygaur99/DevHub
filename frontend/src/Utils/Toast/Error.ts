import { toast, ValueOrFunction, Renderable, Toast } from 'react-hot-toast';

const ErrorToast = (message: ValueOrFunction<Renderable, Toast>) =>
    toast.error(message);

export default ErrorToast;
