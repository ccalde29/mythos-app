// src/components/StoryPage.tsx
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';
import { getStoriesByRegion } from './StoryDatabase';
import Header from './Header';
import { FaPlay, FaStop, FaVolumeUp, FaArrowLeft } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import type { IconType } from 'react-icons';

// Type for our story data
interface Story {
  id: string;
  title: string;
  content: string;
  moral: string;
  region: string;
  duration: number;
  culturalNote?: string;
}

// Fix for React-icons type issues
const PlayIcon = FaPlay as IconType;
const StopIcon = FaStop as IconType;
const VolumeIcon = FaVolumeUp as IconType;
const ArrowLeftIcon = FaArrowLeft as IconType;

export default function StoryPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { speak, stopSpeaking, isSpeaking } = useSpeechSynthesis();
  const [currentParagraph, setCurrentParagraph] = useState<number | null>(null);

  // Get story from location state or database
  const region = location.state?.region?.id || 'west-african';
  const stories = getStoriesByRegion(region);
  const story: Story | undefined = id ? stories[id] : location.state?.story;

  // Stop speech when leaving page
  useEffect(() => {
    return () => stopSpeaking();
  }, [stopSpeaking]);

  if (!story) {
    navigate('/stories');
    return null;
  }

  const handleReadAloud = () => {
    const readingText = `${story.title}. ${story.content}. The moral is: ${story.moral}`;
    speak(readingText);
    setCurrentParagraph(null);
  };

  const handleReadParagraph = (paraIndex: number, text: string) => {
    if (currentParagraph === paraIndex) {
      stopSpeaking();
      setCurrentParagraph(null);
    } else {
      speak(text);
      setCurrentParagraph(paraIndex);
    }
  };

  const paragraphs = story.content.split('\n\n');

  return (
    <div className="min-h-screen flex flex-col bg-amber-50">
      <Header />
      
      <main className="flex-grow p-6 md:p-8 max-w-4xl mx-auto w-full">
        {/* Story Card */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
          {/* Story Header */}
          <div className="flex justify-between items-start mb-4 flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">
                {story.region === 'Nordic' ? '❄️' : '🦁'}
              </span>
              <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm">
                {story.region} Folktale • {story.duration} min read
              </span>
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={isSpeaking ? stopSpeaking : handleReadAloud}
                className={`p-3 rounded-full flex items-center gap-2 ${
                  isSpeaking && currentParagraph === null 
                    ? 'bg-red-100 text-red-600' 
                    : 'bg-amber-100 text-amber-600 hover:bg-amber-200'
                }`}
              >
                {isSpeaking && currentParagraph === null ? (
                  <><StopIcon /> Stop Reading</>
                ) : (
                  <><PlayIcon /> Read Aloud</>
                )}
              </button>
            </div>
          </div>

          {/* Story Title */}
          <h1 className="text-3xl font-bold text-amber-800 mb-6">
            {story.title}
          </h1>
          
          {/* Story Content */}
          <div className="prose prose-lg max-w-none">
            {paragraphs.map((para: string, i: number) => (
              <div 
                key={i} 
                className={`mb-4 flex items-start group ${
                  currentParagraph === i ? 'bg-amber-50 rounded p-2' : ''
                }`}
              >
                <button 
                  onClick={() => handleReadParagraph(i, para)}
                  className={`mr-2 mt-1 ${
                    currentParagraph === i 
                      ? 'text-amber-700' 
                      : 'text-amber-500 hover:text-amber-700 opacity-70 group-hover:opacity-100'
                  } transition-all`}
                  aria-label="Read paragraph"
                >
                  <VolumeIcon size={16} />
                </button>
                <p className="text-gray-700">{para}</p>
              </div>
            ))}
          </div>
          
          {/* Moral Section */}
          {story.moral && (
            <div className="mt-8 p-4 bg-amber-50 border-l-4 border-amber-300 rounded-r">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => speak(`The moral is: ${story.moral}`)}
                  className="text-amber-600 hover:text-amber-800 transition-colors"
                >
                  <VolumeIcon size={18} />
                </button>
                <h3 className="font-bold text-amber-800">The Moral:</h3>
              </div>
              <p className="text-gray-700 mt-1 ml-8">{story.moral}</p>
              
              {story.culturalNote && (
                <div className="mt-3 pt-3 border-t border-amber-200">
                  <p className="text-sm text-gray-500">{story.culturalNote}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => {
              stopSpeaking();
              navigate('/stories', { state: { region } });
            }}
            className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
          >
            <ArrowLeftIcon /> All {story.region} Stories
          </button>
          
          <button
            onClick={() => {
              stopSpeaking();
              navigate('/onboarding');
            }}
            className="bg-amber-100 hover:bg-amber-200 text-amber-800 px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
          >
            🌍 Choose Another Culture
          </button>
        </div>
      </main>
    </div>
  );
}