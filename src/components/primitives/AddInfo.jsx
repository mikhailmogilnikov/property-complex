function AddInfo({ icon, content }) {
  return (
    <div className='flex flex-row gap-2 items-center'>
      <div className='w-4 h-4'>{icon}</div>
      <p className='w-full text-sm font-normal'>{content}</p>
    </div>
  );
}

export default AddInfo;
