import PropTypes from 'prop-types'
import Button from './Button'
import axios from 'axios'

const Header = ({title}) => {
    const onClick = () => {
        axios.get('/')
        .then((response)=> {
            console.log(response.data)
        })
    }
    
    return (
        <header>
            <h1>{title}</h1>
            <Button color='green' text='Add' onClick={onClick}/>

            
        </header>
    )
}

Header.propTypes = {
    title: PropTypes.string,
}

export default Header
