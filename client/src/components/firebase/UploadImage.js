import { useState } from "react";
import storage from "../../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const UploadImage = (props) => {
    const [file, setFile] = useState("");
    const [percent, setPercent] = useState(0);

    // Handle file upload event and update state
    function handleChange(event) {
        setFile(event.target.files[0]);
        handleUpload(event.target.files[0])
    }

    const handleUpload = (file) => {
        if (!file) {
            alert("Please upload an image first!");
        }

        const storageRef = ref(storage, `/files/${file.name}`);

        // progress can be paused and resumed. It also exposes progress updates.
        // Receives the storage reference and the file to upload.
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );

                // update progress
                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log(url);
                    props.setUrl(url)
                });
            }
        );
    };

    return (
        <div style={{ fontSize: "14px", fontWeight: "600" }}>
            <input type="file" onChange={handleChange} accept="/image/*" />
            <p>{percent} "% done"</p>
        </div>
    );
}

export default UploadImage;