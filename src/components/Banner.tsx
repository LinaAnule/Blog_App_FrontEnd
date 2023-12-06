const Banner = ({props}:{props: string}) => {
    return(
        <div className="alert alert-dark opacity-75" role="alert">
            {props}
        </div>
    );
}
export default Banner;
