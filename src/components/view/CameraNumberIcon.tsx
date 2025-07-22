const CameraNumberIcon = ({number = 1}:{number:number}) => {
    return(
        <div className="absolute top-[-4px] left-[-1px] z-[1]">
            <span className="flex items-center justify-center w-4 h-4 rounded-full bg-blue-400 text-white font-bold text-sm shadow">
                {number}
            </span>
        </div>
    )
}

export default CameraNumberIcon