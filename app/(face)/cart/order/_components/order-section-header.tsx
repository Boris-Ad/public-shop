
export const OrderSectionHeader = ({number,title}:{number:number,title:string}) => {
    return (
        <div className="px-4 py-2 md:py-3 bg-face-popover flex items-center space-x-4 text-lg md:text-xl">
            <p className="w-6 border-r border-card/40">{number}</p>
            <h3>{title}</h3>
        </div>
    )
}