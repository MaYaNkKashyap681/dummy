import React, { useState } from 'react';

const Question = () => {
  const [questionDescription, setQuestionDescription] = useState('');
  const [audioFile, setAudioFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [options, setOptions] = useState(['', '', '', '']);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleFileChange = (event, type) => {
    const file = event.target.files[0];

    if (type === 'audio') {
      setAudioFile(file);
    } else if (type === 'image') {
      setImageFile(file);
    }
  };

  return (
    <section className='w-[80%] mx-auto mt-[2rem]'>
      <div>
        <h2 className="text-3xl font-bold ">Create Question</h2>
      </div>

      <div className="mt-[1rem]">
        <div>
          <span>Question Description</span>
          <textarea
            value={questionDescription}
            onChange={(e) => setQuestionDescription(e.target.value)}
            className="h-[10rem] w-full p-3 border-[2px] border-gray-500 border-dotted rounded-lg resize-none focus:outline-none"
          ></textarea>
        </div>
        <div className="mt-4">
          <div>
            <label htmlFor="audioInput">Audio Input</label>
            <input
              type="file"
              id="audioInput"
              onChange={(e) => handleFileChange(e, 'audio')}
            />
            {audioFile && (
              <audio controls className="mt-2">
                <source src={URL.createObjectURL(audioFile)} type="audio/*" />
                Your browser does not support the audio tag.
              </audio>
            )}
          </div>
          <div className="mt-4">
            <label htmlFor="imageInput">Image Input</label>
            <input
              type="file"
              id="imageInput"
              onChange={(e) => handleFileChange(e, 'image')}
            />
            {imageFile && (
              <img
                src={URL.createObjectURL(imageFile)}
                alt="Preview"
                className="mt-2 max-w-full h-auto"
              />
            )}
          </div>
        </div>
        <div className="mt-4">
          <span>Options</span>
          {options.map((option, index) => (
            <input
              key={index}
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className="block w-full p-3 border-[2px] border-gray-500 border-dotted rounded-lg mt-2"
              placeholder={`Option ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Question;