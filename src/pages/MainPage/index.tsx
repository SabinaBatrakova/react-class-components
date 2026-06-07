import useStore from '../../store'

export function MainPage() {
  const formData = useStore((state) => state.formData)

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h2 className="text-2xl font-bold text-primary mb-6">Submissions</h2>
      <div className="grid grid-cols-2 gap-4">
        {formData.map((item, index) => (
          <div
            key={index}
            className="border border-primary-light rounded-lg p-4 shadow-sm bg-primary-light"
          >
            <p className="font-bold text-primary">{item.name}</p>
            <p className="text-gray-600">{item.age}</p>
            <p className="text-gray-600">{item.email}</p>
            <p className="text-gray-600">{item.gender}</p>
            <p className="text-gray-600">{item.country}</p>
            <p className="text-primary">
              {item.terms ? 'Terms accepted' : 'Terms not accepted'}
            </p>
            <img
              src={typeof item.image === 'string' ? item.image : ''}
              alt="uploaded"
              className="mt-2 rounded w-24 h-24 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
