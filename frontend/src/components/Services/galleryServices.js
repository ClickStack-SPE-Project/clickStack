import axios from "axios";

import {BASE_URI} from "../../utils";

class Gallery {
    async getAllAlbums() {
        try {
            const response = await axios.get(BASE_URI +"/album/getAllAlbum", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("accesstoken")
                }
            });

            if (response.status === 200) {
                return response.data;
            } else {
                throw new Error("Unexpected response status: " + response.status);
            }
        } catch (error) {
            if (error.response && (error.response.status === 403 || error.response.status === 401)) {
                return "You are not Authorized";
            } else {
                return "An unexpected error occurred. Please try again later.";
            }
        }
    }
    async getAllPhotos(albumName,setErrorAlbum) {
        try {
            const response = await axios.get(BASE_URI +"/photos/getAllPhotos/"+albumName, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("accesstoken")
                }
            });

            if (response.status === 200) {
                return response.data;
            } else {
                throw new Error("Unexpected response status: " + response.status);
            }
        } catch (error) {
            if (error.response && (error.response.status === 403 || error.response.status === 401)) {
                setErrorAlbum("You are not Authorized");
                return "You are not Authorized";
            } 
            if (error.response && (error.response.status === 404 )) {
                setErrorAlbum("No Data Available");
                return "No Data Available";
            } 
            else {
                setErrorAlbum("An unexpected error occurred. Please try again later.");
                return "An unexpected error occurred. Please try again later.";
            }
        }
    }
    async deleteAlbum(albumName) {
        try {
            const response = await axios.delete(BASE_URI +"/album/deleteAlbum/"+albumName, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("accesstoken")
                }
            });

            if (response.status === 200) {
                return response.data;
            } else {
                throw new Error("Unexpected response status: " + response.status);
            }
        } catch (error) {
            if (error.response && (error.response.status === 403 || error.response.status === 401)) {
                return "You are not Authorized";
            } else {
                return "An unexpected error occurred. Please try again later.";
            }
        }
    }
    async deletePhoto(image,albumName) {
        try {
            const response = await axios.delete(BASE_URI +"/photos/deletePhoto/"+albumName+"/"+image.name, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("accesstoken")
                }
            });

            if (response.status === 200) {
                return response.data;
            } else {
                throw new Error("Unexpected response status: " + response.status);
            }
        } catch (error) {
            if (error.response && (error.response.status === 403 || error.response.status === 401)) {
                return "You are not Authorized";
            } else {
                return "An unexpected error occurred. Please try again later.";
            }
        }
    }
    async downloadPhoto(imageName) {
        try {
            const response = await axios.get(BASE_URI +"/photos/download/"+imageName, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("accesstoken")
                }
            });

            if (response.status === 200) {
                return response.data;
            } else {
                throw new Error("Unexpected response status: " + response.status);
            }
        } catch (error) {
            if (error.response && (error.response.status === 403 || error.response.status === 401)) {
                return "You are not Authorized";
            } else {
                return "An unexpected error occurred. Please try again later.";
            }
        }
    }
}

const galleryInstance = new Gallery();

export default galleryInstance;
