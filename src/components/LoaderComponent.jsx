import {RotatingLines} from "react-loader-spinner";

export const LoaderComponent = () =>{
    return(
        <div style={
            {
                minHeight:"300px",
                display:"flex",
                flexWrap:"wrap",
                justifyContent:"center",
                alignItems:"center"

            }}>
            <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="96"
                visible={true}
             />
        </div>
    )
}