import { useForm, SubmitHandler } from "react-hook-form";
type Inputs = {
    email: string,
    password: string,
  };
function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const login: SubmitHandler<Inputs> = () => {
        console.log(123);
    }
        return (
            <>
                <section className="bg-gray-50 dark:bg-gray-900">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                            <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                            Phankaoo
                        </a>
                        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    Đăng nhập tài khoản
                                </h1>
                                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(login)}>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                        <input type="email" {...register("email", { required: true })} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg  block w-full p-2.5 focus:outline-none focus:ring focus:ring-blue-300" placeholder="name@company.com" />
                                        {errors.email && <span className="text-red-500 text-xs">Bạn chưa nhập email</span>}
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu</label>
                                        <input type="password" {...register("password", { required: true })} id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 focus:outline-none focus:ring focus:ring-blue-300" />
                                        {errors.password && <span className="text-red-500 text-xs">Bạn chưa nhập mật khẩu</span>}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-start">
                                            <div className="flex items-center h-5">
                                                <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label className="text-gray-500 dark:text-gray-300">Ghi nhớ</label>
                                            </div>
                                        </div>
                                        <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Quên mật khẩu?</a>
                                    </div>
                                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Đăng nhập</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

            </>
        )
    }

    export default Login
