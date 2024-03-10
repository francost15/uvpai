interface Props {
  userScore: number;
  errors?: string[]; // Hacer 'errors' opcional
  message: string;
}

export const GptOrthographyMessage = ({ userScore, errors = [], message }: Props) => { // Proporcionar un valor predeterminado para 'errors'
  return (
    <div className="col-start-1 col-end-9 p-1 rounded-lg">
      <div className="flex flex-row items-start">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-yellow-400 flex-shrink-0">
          JS
        </div>
        <div className="relative ml-3 text-sm bg-white bg-opacity-25 pt-3 pb-2 px-4 shadow rounded-xl">

          <h3 className="text-3xl">Puntaje: { userScore }%</h3>
          <p>{ message }</p>

          {
            (errors && errors.length === 0) // Verificar si 'errors' está definido y su longitud es cero
            ? <p>No se encontraron errores, perfecto!</p>
            : (
              <>
                <h3 className="text-2xl">Errores encontrados</h3>
                <ul>
                  {
                    errors && errors.map((error, i) => ( // Verificar si 'errors' está definido antes de mapear
                      <li key={ i }>
                        { error }
                      </li>
                    ))
                  }
                </ul>
              </>
            )
          }
        </div>
      </div>
    </div>
  );
};
