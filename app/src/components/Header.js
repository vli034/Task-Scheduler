import PropTypes  from "prop-types";
import Button from "./Button";

const Header = ({title, onAdd, showButton}) => {

    return (
        <header>
            <h1 className='header'>
                {title}
            </h1>
            <Button color= {showButton? 'red' : 'green'} text={showButton ? 'Close': 'Add'}  onClick={onAdd}/>
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