'use client';

export default function GallerySection({ title, image1, image2 }) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        {title && <h2 className="text-3xl font-bold font-poppins text-navy mb-12 text-center">{title}</h2>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-2xl overflow-hidden h-64 md:h-80 shadow-md">
            {image1 ? (
              <img src={image1} alt="Gallery 1" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            ) : (
              <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">Add Image URL 1</div>
            )}
          </div>
          <div className="rounded-2xl overflow-hidden h-64 md:h-80 shadow-md">
            {image2 ? (
              <img src={image2} alt="Gallery 2" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            ) : (
              <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">Add Image URL 2</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
