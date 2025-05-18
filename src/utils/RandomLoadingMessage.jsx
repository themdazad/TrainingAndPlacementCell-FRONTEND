
// Array of loading messages
const loadingMessages = [
  "Building bridges to your future... Please wait!",
  "Polishing your dream job… Hang tight!",
  "Crafting your success story… Almost there!",
  "Unlocking doors to new opportunities… One moment!",
  "Preparing your future, one placement at a time… Please be patient!",
  "Gearing up for your big break… Hang on a sec!",
  "On the road to your dream job… Just a little more time!",
  "Sourcing your next career step… Stay with us!",
  "Perfecting your placement match… Almost ready!",
  "Your future is loading… Exciting things ahead!"
];

// Function to get a random loading message
const getRandomLoadingMessage = () => {
  const randomIndex = Math.floor(Math.random() * loadingMessages.length);
  return loadingMessages[randomIndex];
};

const RandomLoadingMessage = () => {
  return (
    <div className=' grid place-content-center min-h-max py-12 overflow-hidden text-center px-[5%]'>
      <h1 className=' text-4xl mb-[1.5rem] font-bold' >{getRandomLoadingMessage()}</h1>
      <p className=' text-[14px] sm:text-lg text-zinc-500'>Training and Placement Cell <br /> Government Engineering College Siwan</p>
    </div>
  );
};


export default RandomLoadingMessage;
