import Image from "next/image";

// basic structure of the cards in the home page. 
export default function Card({ img, title, description, handleClick, className }) {

    const baseStructure = "px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer";
    const classes = `${baseStructure}${className ? ' '+ className : ''}`;

    return (
        <div 
            className={ classes } 
            onClick={ handleClick }
        >
            <div className="flex-center glassmorphism size-12 rounded-[10px]">
                <Image
                    src={ img }
                    alt='meeting'
                    width={ 27 }
                    height={ 27 }
                />
            </div>

            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold">{ title }</h1>
                <p className="text-lg font-normal">{ description }</p>
            </div>
        </div>
    );
}