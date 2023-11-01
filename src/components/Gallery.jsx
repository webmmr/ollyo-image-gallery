import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

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
  const [selected, setSelected] = useState(0);
  const [gallery, setGallery] = useState(images);

  function handleOnDragStart(final) {
    console.log(final);
  }

  function handleOnDragEnd(final) {
    if (!final.destination) return;

    const updatedGallery = Array.from(gallery);
    const [reorderedItem] = updatedGallery.splice(final.source.index, 1);
    updatedGallery.splice(final.destination.index, 0, reorderedItem);

    setGallery(updatedGallery);
  }

  return (
    <section className="container">
      <div className="header">
        <p>{selected} images selected</p>
        <button>Delete Images</button>
      </div>
      <DragDropContext
        onDragStart={handleOnDragStart}
        onDragEnd={handleOnDragEnd}
      >
        <Droppable droppableId="images">
          {(provided) => (
            <ul
              className="gallery"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {gallery.map((item, index) => {
                return (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <li
                        className={`gallery-item gallery-item-${index + 1}`}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <input
                          type="checkbox"
                          name="galleryImages"
                          id={item.id}
                        />
                        <img src={item.src} alt={item.id} />
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </section>
  );
}
