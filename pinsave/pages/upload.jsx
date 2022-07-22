import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { SpinnerGap } from "phosphor-react";
import { ContentRecordDAC } from "@skynetlabs/content-record-library";
import { SkynetClient } from "skynet-js";

const portal = "https://siasky.net";
const client = new SkynetClient(portal);

function Upload() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadState, setUploadState] = useState(false);
  const [postId, setPostId] = useState("");
  const [postDesc, setPostDesc] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [uploading, setUploading] = useState();

  const [mySky, setMySky] = useState();
  const [loggedIn, setLoggedIn] = useState(null);

  const hiddenFileInput = useRef();

  const dataDomain = "localhost";

  function filledFields() {
    return postId !== "" && postDesc !== "" && postTitle !== "";
  }

  useEffect(() => {
    // define async setup function
    async function initMySky() {
      try {
        const contentRecord = new ContentRecordDAC();
        console.log(contentRecord);
        // load invisible iframe and define app's data domain
        // needed for permissions write

        console.log(1);

        const mySky = await client.loadMySky(dataDomain);
        //await mySky.requestLoginAccess();
        console.log(12);
        // check if user is already logged in with permissions
        const loggedIn = await mySky.checkLogin();
        console.log(loggedIn);
        // set react state for login status and
        // to access mySky in rest of app
        //setMySky(mySky);
        setLoggedIn(loggedIn);
        const jsonData = {
          dataDomain,
        };

        if (loggedIn) {
          console.log(2);
          //bugs
          await mySky.loadDacs(contentRecord);
          //await mySky.setJSON(dataDomain + "/", jsonData);

          /* await contentRecord.recordNewContent({
            skylink: jsonData.dataDomain,
          }); */
          // no such state
          //setUserID(await mySky.userID());
          console.log(3);
        }
      } catch (e) {
        console.error(e);
      }
    }

    // call async setup function
    initMySky();
  }, []);

  async function str() {
    const filled = filledFields();

    if (!uploading && filled) {
      setUploading(true);
      const dataDomain = "localhost/";

      const mySky = await client.loadMySky(dataDomain);
      const loggedIn = await mySky.checkLogin();
      console.log(loggedIn);

      if (loggedIn) {
        await mySky.setJSON(dataDomain, jsonData);
        await mySky.loadDacs(contentRecord);
        console.log(2);
        const { data } = await mySky.getJSON(dataDomain);
        console.log(data);
        //setUserID(await mySky.userID());
      }

      const { skylink } = await client.uploadFile(selectedImage);
      const skylinkUrl = await client.getSkylinkUrl(skylink);
      console.log("File Uploaded:", skylinkUrl);

      toast.success("Image Uploaded Successfully", {
        style: {
          borderRadius: "10px",
          background: "#222",
          color: "#fff",
        },
      });
      setUploading(false);
    }
  }

  return (
    <div className="mx-3">
      <div className="mt-6 max-w-screen-md mx-auto">
        <div className="items-center -mx-2 md:flex">
          <div className="w-full mx-2">
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Name id
            </label>
            <input
              value={postId}
              onChange={(e) => setPostId(e.target.value)}
              className="block w-11/12 md:w-full px-4 py-2 text-gray-700 bg-white border rounded-md  focus:border-blue-400 focus:ring-blue-300 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              type="text"
            />
          </div>

          <div className="w-full mx-2 mt-4 md:mt-0">
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Title
            </label>
            <input
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              className="block w-11/12 md:w-full px-4 py-2 text-gray-700 bg-white border rounded-md  focus:border-blue-400 focus:ring-blue-300 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              type="text"
            />
          </div>
        </div>

        <div className="w-full mt-4">
          <label className="block mb-2 text-sm font-medium text-gray-600">
            Description
          </label>

          <textarea
            value={postDesc}
            onChange={(e) => setPostDesc(e.target.value)}
            className="block w-full h-20 px-4 py-2 text-gray-700 bg-white border rounded-md  focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
          ></textarea>
        </div>
      </div>
      <div className="text-center mt-5">
        <div className="rounded-md border-dashed border-4 max-w-screen-md p-3 mx-auto">
          <input
            className="hidden"
            type="file"
            name="myImage"
            ref={hiddenFileInput}
            onChange={(event) => {
              if (event.target.files[0].type.includes("image")) {
                setSelectedImage(event.target.files[0]);
                setUploadState(true);
              }
            }}
          />

          {selectedImage && (
            <img
              src={URL.createObjectURL(selectedImage)}
              alt=""
              className="rounded-md max-h-96 mt-4 mx-auto"
            />
          )}
          <button
            onClick={() => {
              hiddenFileInput.current.click();
            }}
            className="text-emerald-50 font-semibold m-3 text-lg p-2 rounded-full  bg-sky-600"
          >
            {selectedImage ? "Replace file" : "Add a File"}
          </button>
        </div>
      </div>
      {uploadState && (
        <div className="text-center">
          <br />
          <button
            onClick={str}
            disabled={uploading}
            className=" rounded-full  p-3 m-1 text-2xl disabled:bg-emerald-700 disabled:opacity-60 bg-emerald-600 text-white"
          >
            {uploading ? (
              <SpinnerGap size={28} className="animate-spin my-auto mx-1" />
            ) : (
              "Submit"
            )}
          </button>
        </div>
      )}
    </div>
  );
}

export default Upload;
