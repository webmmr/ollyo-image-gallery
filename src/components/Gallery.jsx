import { useRef, useState } from "react";

const MAX_FILE_SIZE = 1 * 1024 * 1024;

const images = [
  {
    id: "image1",
    src: "/images/image-1.webp",
  },
  {
    id: "image2",
    src: "/images/image-2.webp",
  },
  {
    id: "image3",
    src: "/images/image-3.webp",
  },
  {
    id: "image4",
    src: "/images/image-4.webp",
  },
  {
    id: "image5",
    src: "/images/image-5.webp",
  },
  {
    id: "image6",
    src: "/images/image-6.webp",
  },
  {
    id: "image7",
    src: "/images/image-7.webp",
  },
  {
    id: "image8",
    src: "/images/image-8.webp",
  },
  {
    id: "image9",
    src: "/images/image-9.webp",
  },
  {
    id: "image10",
    src: "/images/image-10.jpeg",
  },
  {
    id: "image11",
    src: "/images/image-11.jpeg",
  },
];

export default function Gallery() {
  const [isSelected, setIsSelected] = useState([]);
  const [gallery, setGallery] = useState(images);
  const dragImage = useRef(null);
  const draggedOverImage = useRef(null);

  // Checking and Selecting which items are selected
  function handleChange(e) {
    const { value, checked } = e.target;

    if (checked) {
      setIsSelected((prev) => [...prev, value]);
    } else {
      setIsSelected((prev) => prev.filter((item) => item !== value));
    }
  }

  // Deleting Selected Items and updating the gallery
  function handleDelete() {
    const updatedGalley = gallery.filter((item) => {
      if (!isSelected.includes(item.id)) return item;
    });

    setGallery(updatedGalley);
    setIsSelected([]);
  }

  // Pushing the images while dragging to create space for the dragged one
  function handleOnDragEnter(index) {
    if (dragImage.current === index) return;

    const updatedGallery = [...gallery];
    const draggedItem = updatedGallery[dragImage.current];

    updatedGallery.splice(dragImage.current, 1);
    updatedGallery.splice(index, 0, draggedItem);

    setGallery(updatedGallery);
    dragImage.current = index;
  }

  // Image Upload Functionality
  function handleImageUpload(e) {
    const file = e.target.files[0];
    if (file) {
      if (file.size <= MAX_FILE_SIZE) {
        const newImage = {
          id: `image${images.length + 1}`,
          src: `/images/${file.name}`,
        };

        // New Image can be pushed here to the gallery array and also use a backend server to store the new Image
        // setGallery((prev) => [...prev, newImage]);

        console.log(
          "New Gallery with the updated Item if the previous setGallery function is invoked"
        );
      } else {
        alert(
          "File size exceeds 1MB. Or File type not supported Please choose a different file."
        );
      }
    }
  }

  // removing the dragging class at the end of dragging
  function handleDragEnd() {
    const draggedItem = document.querySelector(".gallery-item.dragging");
    if (draggedItem) {
      draggedItem.classList.remove("dragging");
    }
  }

  return (
    <section className="container">
      <div className="header">
        <h1>
          {isSelected.length > 0
            ? `${isSelected.length} Imgaes Selected`
            : "Gallery"}
        </h1>

        {isSelected.length > 0 ? (
          <button onClick={handleDelete}>Delete Images</button>
        ) : (
          ""
        )}
      </div>

      <ul className="gallery">
        {gallery.map((item, index) => {
          return (
            <li
              key={item.id}
              className={`gallery-item gallery-item-${index + 1} ${
                dragImage.current === index ? "dragging" : ""
              } ${draggedOverImage.current === index ? "drag-over" : ""}`}
              draggable
              onDragStart={() => (dragImage.current = index)}
              onDragEnter={() => handleOnDragEnter(index)}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => e.preventDefault()}
            >
              <input
                type="checkbox"
                name="galleryImages"
                id={item.id}
                value={item.id}
                onChange={handleChange}
              />
              <img src={item.src} alt={item.id} />
            </li>
          );
        })}

        <li className=" add">
          <label className="image-upload">
            <img src="/images/placeholder.png" alt="placeholder image" />
            <p>Add Image</p>
            <input
              type="file"
              accept="image/jpeg, image/png, image/webp"
              onChange={handleImageUpload}
            />
          </label>
        </li>
      </ul>
    </section>
  );
}
