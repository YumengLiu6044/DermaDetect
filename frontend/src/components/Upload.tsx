export default function UploadSection(props: {selectedFile: File | null}) {
  return props.selectedFile ? (
    
      <div className="flex flex-col justify-center rounded-lg p-1">
        <img
          src={URL.createObjectURL(props.selectedFile)}
          alt="Selected"
          className="object-cover rounded-lg"
        />
      </div>
    
  ) : (
    <div className="p-5">
      <i className="fas fa-camera text-4xl text-gray-400 mb-4"></i>
      <h3 className="text-lg font-medium text-gray-900">
        Upload Skin Image
      </h3>
      <p className="mt-1 text-sm text-gray-500">
        Drag & drop your image here or click to browse
      </p>
      <p className="mt-2 text-xs text-gray-400">
        Supported formats: JPG, PNG (Max 5MB)
      </p>
    </div>
  );
}