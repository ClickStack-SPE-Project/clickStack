import axios from "axios"

import {BASE_URI} from "../../utils";
class AddAlbum {
    async addAlbum(data,setError){ 
        axios.post(BASE_URI + "/album/createAlbum", data, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("accesstoken")
            }
        })
        .then((response) => {
            if (response.status === 200) {
            setError("")
        }
        })
        .catch((error) => {
            if (error.response && (error.response.status === 403 || error.response.status === 401)) {
                setError("You are not Authorized to create")
            } else {
                setError("An unexpected error occurred. Please try again later.")
            }
        })
    
    
  
    }
}

const addAlbumInstance = new AddAlbum();

export default addAlbumInstance;