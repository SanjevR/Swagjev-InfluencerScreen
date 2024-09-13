export default function Accordion ({children, title, isOpen}){

    return (<details open={isOpen} >
        <summary>{title}</summary>
            <div>
            {children}
            </div>
        </details>)
}