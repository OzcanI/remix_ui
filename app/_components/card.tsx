export const Card = ({children, title, description, error}: {children: any, title?: string, description?: string, error?: string}) => {
    return <div className="bg-white w-full max-w-[440px] shadow-custom_1 pt-[35px] px-[30px] rounded-[8px]">
        {error && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                <span className="font-medium">Error!</span> {error}
            </div>}
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="32" viewBox="0 0 40 32">
            <g fill="none" fillRule="evenodd">
                <path fill="#4A4AE5" d="M2.577 10.006L13.998 10.013 14.005 21.638 2.584 21.631z" transform="rotate(-45 8.29 15.822)"/>
                <path fill="#4A77E5" d="M18.337 -0.692L29.758 -0.699 29.737 32.749 18.316 32.756z" transform="rotate(45 24.037 16.028)"/>
            </g>
        </svg>
        {title && <h1 className="text-title mt-[25px] text-dark-blue-grey"> {title} </h1>}
        {description && <h1 className="text-description text-cool-grey-2 mt-[6px] mb-[43px]"> {description} </h1>}
        {children}
    </div>
}