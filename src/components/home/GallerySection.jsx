'use client';

import { ImageIcon } from 'lucide-react';

export default function GallerySection({ title, image1, image2 }) {
  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {title && (
          <div className="flex items-center gap-3 justify-center mb-12">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-gold)]/10 to-[var(--color-gold-dark)]/10 flex items-center justify-center">
              <ImageIcon size={18} className="text-[var(--color-gold)]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-poppins text-[var(--color-navy)]">{title}</h2>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <div className="group relative rounded-2xl overflow-hidden h-72 md:h-96 shadow-lg hover:shadow-2xl transition-all duration-500">
            {image1 ? (
              <>
                <img src={image1} alt="Gallery 1" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </>
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex flex-col items-center justify-center text-slate-400 gap-3">
                <ImageIcon size={40} />
                <span className="text-sm font-medium">Add Image URL 1</span>
              </div>
            )}
          </div>
          <div className="group relative rounded-2xl overflow-hidden h-72 md:h-96 shadow-lg hover:shadow-2xl transition-all duration-500 md:mt-16">
            {image2 ? (
              <>
                <img src={image2} alt="Gallery 2" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </>
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex flex-col items-center justify-center text-slate-400 gap-3">
                <ImageIcon size={40} />
                <span className="text-sm font-medium">Add Image URL 2</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
