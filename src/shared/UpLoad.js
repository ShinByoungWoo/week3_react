import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../elements";
import { storage } from "./firebase";
import { actionCreators as imageActions } from "../redux/modules/image";

const UpLoad = (props) => {
  const fileInput = React.useRef();
  const dispatch = useDispatch();
  const is_uploading = useSelector((state) => state.image.uploading);
  const selectFile = (e) => {
    // e.target은 input이죠!
    // input이 가진 files 객체를 살펴봅시다.
    console.log(e.target.files);
    // 선택한 파일이 어떻게 저장되어 있나 봅시다.
    console.log(e.target.files[0]);

    // ref로도 확인해봅시다. :)
    console.log(fileInput.current.files[0]);

    const reader = new FileReader();
    const file = fileInput.current.files[0]
    reader.readAsDataURL(file);

    reader.onloadend = () => {
        console.log(reader.result)
        dispatch(imageActions.setPreview(reader.result));
    }
  };

  const uploadFB = () => {
    let image = fileInput.current.files[0];
    const _upload = storage.ref(`images/${image.name}`).put(image);

    //   업로드!
    _upload.then((snapshot) => {
      console.log(snapshot);
      snapshot.ref.getDownloadURL().then((url) => {
        console.log(url);
      });
    });
  };

  return (
    <React.Fragment>
      <input type="file" ref={fileInput} onChange={selectFile} disabled={is_uploading}/>
      <Button _onClick={uploadFB}>업로드하기</Button>
    </React.Fragment>
  );
};

export default UpLoad;
