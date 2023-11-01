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
  const [gallery, setGallery] = useState(images);

  function handleOnDragEnd(final) {
    console.log(final);

    if (!final.destination) return;

    const updatedGallery = Array.from(gallery);
    const [reorderedItem] = updatedGallery.splice(final.source.index, 1);
    updatedGallery.splice(final.destination.index, 0, reorderedItem);

    setGallery(updatedGallery);
  }

  return (
    <section className="container">
      <DragDropContext onDragEnd={handleOnDragEnd}>
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
                        className={`gallery-item-${index + 1}`}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
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
