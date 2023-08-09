import React, { useState, useEffect } from "react";

const apiKey = "okHBdIqFHCmm+1cNKVgbkA==nQJoO9i4TaJ8a2Pn";
const apiURL = "https://api.api-ninjas.com/v1/exercises?";

const Workouts = () => {
  const [selectedType, setSelectedType] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [options, setOptions] = useState([]);
  const [apiDataList, setApiDataList] = useState([]);
  const [selectedExerciseOption, setSelectedExerciseOption] = useState("");
  const [selectedExercises, setSelectedExercises] = useState(new Set());
  const [workoutStarted, setWorkoutStarted] = useState(false);
  const [workoutSelected, setWorkoutSelected] = useState(false);
  const [savedWorkouts, setSavedWorkouts] = useState([]);
  const [workoutInProgress, setWorkoutInProgress] = useState(false);

  useEffect(() => {
    const fetchApiData = async () => {
      try {
        const data = await makeApiCall();
        console.log("API Data:", data);
        setApiDataList(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (selectedOption) {
      fetchApiData();
    }
  }, [selectedOption]);

  useEffect(() => {
    const updateOptions = () => {
      switch (selectedType) {
        case "type":
          setOptions(type);
          break;
        case "muscle":
          setOptions(muscle);
          break;
        case "difficulty":
          setOptions(difficulty);
          break;
        default:
          setOptions([]);
      }
    };

    updateOptions();
  }, [selectedType]);

  const handleDropdownChange = (event) => {
    const selectedType = event.target.textContent.toLowerCase();
    setSelectedType(selectedType);
    setSelectedOption("");
  };

  const handleOptionChange = (event) => {
    const selectedOption = event.target.textContent.toLowerCase();
    setSelectedOption(selectedOption);
  };

  const handleExerciseOptionChange = (event) => {
    const selectedExercise = event.target.value;

    if (selectedExercises.has(selectedExercise)) {
      selectedExercises.delete(selectedExercise);
    } else {
      selectedExercises.clear();
      selectedExercises.add(selectedExercise);
      setSelectedExerciseOption(selectedExercise);
    }

    setWorkoutSelected(selectedExercises.size > 0);
  };

  const beginWorkout = () => {
    setWorkoutStarted(true);
    setWorkoutSelected(false);
    setWorkoutInProgress(false);
  };

  const finishWorkout = () => {
    setWorkoutInProgress(false);
    setSavedWorkouts([]);
    setWorkoutStarted(false);
    setSelectedExerciseOption("");
    setSets(0);
    setReps(0);
    setWeight(0);
  };

  const [sets, setSets] = useState(0);
  const [reps, setReps] = useState(0);
  const [weight, setWeight] = useState(0);

  const handleSetsChange = (e) => {
    setSets(e.target.value);
  };

  const handleRepsChange = (e) => {
    setReps(e.target.value);
  };

  const handleWeightChange = (e) => {
    setWeight(e.target.value);
  };

  const saveExercise = () => {
    setWorkoutStarted(false);
    const exerciseData = {
      exerciseName: selectedExerciseOption,
      sets: sets,
      reps: reps,
      weight: weight,
    };

    setSavedWorkouts((prevWorkouts) => [...prevWorkouts, exerciseData]);
    setSelectedExerciseOption("");
    setSets(0);
    setReps(0);
    setWeight(0);
    setSelectedType("");
    setSelectedOption("");
    setApiDataList([]);
    setWorkoutInProgress(true);
  };

  const ExerciseInput = ({ exerciseName }) => {
    return (
      <div>
        <h2 className="mt-5">{exerciseName}</h2>
        <div>
          <label>Sets: </label>
          <input type="number" value={sets} onChange={handleSetsChange} min={0} />
        </div>
        <div>
          <label>Reps: </label>
          <input type="number" value={reps} onChange={handleRepsChange} min={0} />
        </div>
        <div>
          <label>Weight: </label>
          <input type="number" value={weight} onChange={handleWeightChange} min={0} />
        </div>
        <div>
          <button className="btn btn-primary" onClick={saveExercise}>
            Add Exercise
          </button>
        </div>
      </div>
    );
  };

  const makeApiCall = () => {
    const apiURLWithOptions = `${apiURL}${selectedType}=${selectedOption}`;
    console.log("API URL:", apiURLWithOptions);
    return fetch(`${apiURL}${selectedType}=${selectedOption}`, {
      headers: {
        "X-Api-Key": apiKey,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          return data;
        } else {
          return [];
        }
      })
      .catch((error) => {
        console.error("Request failed:", error);
        return [];
      });
  };

  const type = [
    {
      name: "Cardio",
      key: "cardio",
    },
    {
      name: "Olympic Weightlifting",
      key: "olympic_weightlifting",
    },
    {
      name: "Plyometrics",
      key: "plyometrics",
    },
    {
      name: "Powerlifting",
      key: "powerlifting",
    },
    {
      name: "Strength",
      key: "strength",
    },
    {
      name: "Stretching",
      key: "streching",
    },
    {
      name: "Strongman",
      key: "strongman",
    },
  ];

  const muscle = [
    {
      name: "Abdominals",
      key: "abdominals",
    },
    {
      name: "Abductors",
      key: "abductors",
    },
    {
      name: "Adductors",
      key: "adductors",
    },
    {
      name: "Biceps",
      key: "biceps",
    },
    {
      name: "Calves",
      key: "calves",
    },
    {
      name: "Chest",
      key: "chest",
    },
    {
      name: "Forearms",
      key: "forearms",
    },
    {
      name: "Glutes",
      key: "glutes",
    },
    {
      name: "Hamstrings",
      key: "hamstrings",
    },
    {
      name: "Lats",
      key: "lats",
    },
    {
      name: "Lower Back",
      key: "lower_back",
    },
    {
      name: "Middle Back",
      key: "middle_back",
    },
    {
      name: "Neck",
      key: "neck",
    },
    {
      name: "Quadriceps",
      key: "quadriceps",
    },
    {
      name: "Traps",
      key: "traps",
    },
    {
      name: "Triceps",
      key: "triceps",
    },
  ];

  const difficulty = [
    {
      name: "Beginner",
      key: "beginner",
    },
    {
      name: "Intermediate",
      key: "intermediate",
    },
    {
      name: "Expert",
      key: "expert",
    },
  ];

  return (
    <div>
      {!workoutStarted && (
        <section id="workoutSelection">
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle m-1"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {selectedType ? selectedType : "Select"}
            </button>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="#" onClick={handleDropdownChange}>
                  Type
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#" onClick={handleDropdownChange}>
                  Muscle
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#" onClick={handleDropdownChange}>
                  Difficulty
                </a>
              </li>
            </ul>
          </div>

          {selectedType && (
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle m-1"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {selectedOption ? selectedOption : "Select"}
              </button>
              <ul className="dropdown-menu options">
                {options.map((item) => (
                  <li key={item.key}>
                    <a className="dropdown-item" href="#" onClick={handleOptionChange}>
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>

              {selectedOption && (
                <div>
                  <ul className="list-group">
                    {apiDataList.map((exercise, index) => (
                      <li className="list-group-item" key={index}>
                        <input
                          className="form-check-input me-1"
                          type="radio"
                          name="exerciseOptions"
                          onChange={handleExerciseOptionChange}
                          value={exercise.name}
                        />
                        <label className="form-check-label">{exercise.name}</label>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </section>
      )}

      <div className="exerciseTracker">
        <div>
          {workoutSelected && (
            <div>
              <button className="mt-3 btn btn-primary " onClick={beginWorkout}>
                Begin Workout
              </button>
            </div>
          )}
          <div>
            {workoutInProgress && (
              <div className="exerciseContainer">
                <h2>Workout in Progress</h2>
                <ul>
                  {savedWorkouts.map((exercise, index) => (
                    <li key={index}>
                      <strong>Exercise: </strong>
                      {exercise.exerciseName},<strong> Sets: </strong>
                      {exercise.sets},<strong> Reps: </strong>
                      {exercise.reps},<strong> Weight: </strong>
                      {exercise.weight}
                    </li>
                  ))}
                </ul>
                <div>
                  <button className="btn btn-primary" onClick={finishWorkout}>
                    Finish Workout
                  </button>
                </div>
              </div>
            )}
          </div>

          <div>
            {workoutStarted && (
              <div>
                {workoutStarted && selectedExerciseOption && <ExerciseInput exerciseName={selectedExerciseOption} />}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workouts;
