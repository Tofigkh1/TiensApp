export default function UploadSvg(props){
    let {color}=props
    return(
        <>
            <svg width="60" height="40"  viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M48.375 15.1C46.675 6.475 39.1 0 30 0C22.775 0 16.5 4.1 13.375 10.1C5.85 10.9 0 17.275 0 25C0 33.275 6.725 40 15 40H47.5C54.4 40 60 34.4 60 27.5C60 20.9 54.875 15.55 48.375 15.1ZM35 22.5V32.5H25V22.5H17.5L29.125 10.875C29.625 10.375 30.4 10.375 30.9 10.875L42.5 22.5H35Z" fill={color}/>
            </svg>

        </>
    )
}