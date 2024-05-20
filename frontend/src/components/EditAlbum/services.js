import axios from "axios"

import {BASE_URI} from "../../utils";
class EditAlbum {
    async getAlbum(albumName,setData){ 
        axios.get(BASE_URI + "/album/getAlbum/"+ albumName, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("accesstoken")
            }
        })
        .then((response) => {
            if (response.status === 200) {
            setData(response.data);
        }
        })
        .catch((error) => {
            if (error.response && (error.response.status === 403 || error.response.status === 401)) {
                return "You are not Authorized to create"
            } else {
                return "An unexpected error occurred. Please try again later."
            }
        })
    }
    async editAlbum(albumName,data,setUpdateError){
        axios.put(BASE_URI + "/album/updateAlbum/"+ albumName,data, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("accesstoken")
            }
        })
        .then((response) => {
            if (response.status === 200) {
            setUpdateError("")
        }
        })
        .catch((error) => {
            if (error.response && (error.response.status === 403 || error.response.status === 401)) {
                setUpdateError("You are not Authorized to create")
            } else {
                setUpdateError("An unexpected error occurred. Please try again later.")
            }
        })
    }
}

const editAlbumInstance = new EditAlbum();

export default editAlbumInstance;