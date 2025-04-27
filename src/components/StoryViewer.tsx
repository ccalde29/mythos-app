// src/components/StoryViewer.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Story } from '../types';

interface StoryViewerProps {
  story: Story;
}

const StoryViewer: React.FC<StoryViewerProps> = ({ story }) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="mb-6 flex items-start">
        <button 
          onClick={() => navigate(-1)}
          className="text-amber-600 hover:text-amber-800 mr-4"
        >
          ← Back
        </button>
        <div>
          <h1 className="text-3xl font-bold text-amber-800">{story.title}</h1>
          {story.region && (
            <div className="flex items-center mt-2">
              <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm">
                {story.region.name} Mythology
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="prose prose-lg max-w-none">
        {story.content.split('\n\n').map((para: string, i: number) => (
          <p key={i} className="mb-4 text-gray-700">{para}</p>
        ))}
      </div>

      {story.moral && (
        <div className="mt-8 p-4 bg-amber-50 border-l-4 border-amber-300 rounded-r">
          <h3 className="font-bold text-amber-800">The Moral:</h3>
          <p>{story.moral}</p>
        </div>
      )}
    </div>
  );
};

export default StoryViewer;