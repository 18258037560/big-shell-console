/**
 * zhouhangshuai on 2018-1-17
 */
import React from 'react'

interface LocalImageProps {
    file:any
}

class LocalImage  extends React.Component<LocalImageProps> {
    state = {
        loaded:false
    }
    data:any
    componentDidMount(){
        let reader = new FileReader()
        reader.onload = (e:any) => {
            this.data = e.target.result
            this.setState({loaded:true})
        }
        reader.readAsDataURL(this.props.file)
    }
    render() {
        if(this.state.loaded){
            return(
                <img src={this.data} className='img-responsive'/>
            )
        }
        return null
    }
}

export default LocalImage
