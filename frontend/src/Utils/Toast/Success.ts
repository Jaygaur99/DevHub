import { toast  , ValueOrFunction , Renderable , Toast} from 'react-hot-toast';

const SuccessToast = (message:  ValueOrFunction<Renderable, Toast>) => {
    return toast.success(message);
};

export default SuccessToast;
