const BannerError = ({props}:{props: string}) => {
    return(
        <div className="alert alert-danger opacity-75" role="alert">
            {props}
        </div>
    );
}
export default BannerError;