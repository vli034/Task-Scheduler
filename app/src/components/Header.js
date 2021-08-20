import PropTypes  from "prop-types";
import Button from "./Button";

const Header = ({title}) => {
    const onClick = () =>{
        console.log('click')
    }
    return (
        <header>
            <h1 className='header'>
                {title}
            </h1>
            <Button  onClick={onClick}
            color= 'green' text="Add"/>
        </header>
    )

}


Header.defaultProps = {
    title: 'Task Scheduler'
}


Header.propTypes = {
    title: PropTypes.string.isRequired
}

export default Header