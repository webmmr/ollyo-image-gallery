import { useRef, useState } from "react";
// import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

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
  const dragImage = useRef(0);
  const draggedOverImage = useRef(0);

  // Checking and Selecting which items are selected
  function handleChange(e) {
    const { value, checked } = e.target;

    if (checked) {
      setIsSelected((prev) => [...prev, value]);
    } else {
      setIsSelected((prev) => prev.filter((item) => item !== value));
    }
  }

  function addImage() {
    console.log("Image Added");
  }

  // Deleting Selected Items and updating the gallery
  function handleDelete() {
    const updatedGalley = gallery.filter((item) => {
      if (!isSelected.includes(item.id)) return item;
    });

    setGallery(updatedGalley);
  }

  // // sorting after drag
  // function handleSort() {
  //   const dupImages = [...images];

  //   const temp = dupImages[dragImage.current];

  //   dupImages[dragImage.current] = dupImages[draggedOverImage.current];

  //   dupImages[draggedOverImage.current] = temp;

  //   setGallery(dupImages);
  // }

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
              } ${draggedOverImage.current !== index ? "drag-over" : ""}`}
              draggable
              onDragStart={() => (dragImage.current = index)}
              onDragEnter={() => {
                if (dragImage.current === index) return;

                const temp = gallery[dragImage.current];
                const newGallery = [...gallery];
                newGallery[dragImage.current] = newGallery[index];
                newGallery[index] = temp;

                setGallery(newGallery);
                dragImage.current = index;
                draggedOverImage.current = index;
              }}
              // onDragEnd={handleSort}
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
        <li className="gallery-item add" onClick={addImage}>
          <input type="file" name="galleryImages" />
          <img src="/images/placeholder.png" alt="placeholder image" />
          <p>Add Image</p>
        </li>
      </ul>
    </section>
  );
}
