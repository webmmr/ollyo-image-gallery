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
  const dragPerson = useRef(0);
  const draggedOverPerson = useRef(0);

  // Checking and Selecting which items are selected
  function handleChange(e) {
    const { value, checked } = e.target;

    if (checked) {
      setIsSelected((prev) => [...prev, value]);
    }
  }

  // Deleting Selected Items and updating the gallery
  function handleDelete() {
    const updatedGalley = gallery.filter((item) => {
      if (!isSelected.includes(item.id)) return item;
    });

    setGallery(updatedGalley);
  }

  // sorting after drag
  function handleSort() {
    const dupImages = [...images];

    const temp = dupImages[dragPerson.current];

    dupImages[dragPerson.current] = dupImages[draggedOverPerson.current];

    dupImages[draggedOverPerson.current] = temp;

    setGallery(dupImages);
  }

  return (
    <section className="container">
      <div className="header">
        <p>{isSelected.length} Images Selected</p>

        <button onClick={handleDelete}>Delete Images</button>
      </div>

      <ul className="gallery">
        {gallery.map((item, index) => {
          return (
            <li
              key={item.id}
              className={`gallery-item gallery-item-${index + 1}`}
              draggable
              onDragStart={() => (dragPerson.current = index)}
              onDragEnter={() => (draggedOverPerson.current = index)}
              onDragEnd={handleSort}
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
      </ul>
    </section>
  );
}
