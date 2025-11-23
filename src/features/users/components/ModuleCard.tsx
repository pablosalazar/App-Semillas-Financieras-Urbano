interface ModuleCardProps {
  id: number;
  name: string;
  image: string;
  completed?: boolean;
}

export function ModuleCard({
  id,
  name,
  image,
  completed = false,
}: ModuleCardProps) {
  const progress = completed ? 100 : 0;
  const progressText = completed ? "Completado" : "Sin iniciar";

  return (
    <div className="relative flex flex-col gap-3 bg-white rounded-2xl py-3 px-5 shadow-md hover:shadow-lg transition-shadow">
      {/* Module Number Badge */}
      <div className="absolute -top-2 -right-2 z-10 w-8 h-8 rounded-full bg-linear-to-br from-(--orange-light) to-(--orange) border-3 border-white shadow-lg flex items-center justify-center">
        <span className="text-white font-bold text-sm">{id}</span>
      </div>
      <div className="relative overflow-hidden rounded-xl">
        <img src={image} alt={name} className="w-full" />
      </div>

      <div className="space-y-1">
        <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden border border-gray-300">
          <div
            className={`h-full transition-all duration-500 ease-out ${
              completed ? "bg-green-500" : "bg-gray-300"
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress text */}
        <p
          className={`text-xs font-semibold text-center ${
            completed ? "text-green-600" : "text-gray-500"
          }`}
        >
          {progressText}
        </p>
      </div>
    </div>
  );
}
