import React, { useState, type FormEventHandler } from "react";

const New = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const inputFileRef = React.useRef<HTMLInputElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!inputFileRef.current?.files?.[0]) {
      console.log("Please, select file you want to upload");
      return;
    }
    const resData = (await blobToData(
      inputFileRef.current?.files?.[0],
    )) as string;

    console.log(resData);

    await fetch("/api/groups/new", {
      method: "POST",
      body: JSON.stringify({
        name,
        description,
        icon: resData,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  const blobToData = (blob: Blob) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            name="name"
            id="name"
            className="border"
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            name="description"
            id="description"
            className="border"
          />
        </div>
        <div>
          <label htmlFor="file">Icon</label>
          <input
            type="file"
            name="file"
            id="file"
            className="border"
            accept="image/*"
            ref={inputFileRef}
          />
        </div>
        <button
          type="submit"
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default New;
