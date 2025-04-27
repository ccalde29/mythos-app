// src/components/StorySelection.tsx
import { useLocation, useNavigate } from 'react-router-dom';
import { getStoriesByRegion } from './StoryDatabase';
import Header from './Header';
import { CulturalRegion, Grade } from '../types';

export default function StorySelection() {
  const location = useLocation();
  const navigate = useNavigate();
  const { grade, region } = location.state as {
    grade: Grade;
    region: CulturalRegion;
  } || {};

  // Redirect if missing data
  if (!grade || !region) {
    navigate('/onboarding');
    return null;
  }

  const stories = Object.values(getStoriesByRegion(region.id));

  return (
    <div className="min-h-screen flex flex-col bg-amber-50">
      <Header />
      
      <main className="flex-grow p-6 md:p-8 max-w-4xl mx-auto w-full">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-amber-800 mb-2">
            {region.name} Stories for {grade.name}
          </h1>
          <p className="text-amber-600">
            Pick a story to begin your adventure!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map(story => (
            <div 
              key={story.id}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer flex flex-col"
              onClick={() => navigate(`/story/${story.id}`, { 
                state: { 
                  story,
                  region,
                  grade 
                } 
              })}
            >
              <h2 className="text-xl font-bold text-amber-700 mb-2">
                {story.title}
              </h2>
              <p className="text-gray-600 mb-3 flex-grow">
                {story.content.substring(0, 100)}...
              </p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-amber-600">
                  {story.duration} min read
                </span>
                <span className="text-sm bg-amber-100 text-amber-800 px-2 py-1 rounded">
                  {story.moral}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/onboarding')}
            className="text-amber-600 hover:text-amber-800 underline"
          >
            ← Choose different grade or region
          </button>
        </div>
      </main>
    </div>
  );
}