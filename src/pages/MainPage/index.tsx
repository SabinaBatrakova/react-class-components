import useStore from '../../store'

export function MainPage() {
  const formData = useStore((state) => state.formData)

  return (
    <div>
      <h2>Submissions</h2>
      {formData.map((item, index) => (
        <div key={index}>
          <p>{item.name}</p>
          <p>{item.age}</p>
          <p>{item.email}</p>
          <p>{item.gender}</p>
          <p>{item.country}</p>
          <p>{item.terms ? 'Terms accepted' : 'Terms not accepted'}</p>
          <img src={typeof item.image === 'string' ? item.image : ''} alt="uploaded" width={100} />
        </div>
      ))}
    </div>
  )
}
