import React, { useState, useEffect } from "react";
import RatingModal from "../components/Modal";
import { useMutation } from "@apollo/client";
import { ADD_WORKOUT } from "../utils/mutations";
import { QUERY_ME } from "../utils/queries";
import apiKey from "../../../server/server";

const apiKey = process.env.REACT_APP_API_KEY;
// const apiURL = "https://api.api-ninjas.com/v1/exercises?";

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
  const [modalShow, setModalShow] = useState(false);
  const [selectedExerciseInstructions, setSelectedExerciseInstructions] = useState("");
  const [selectedExerciseDifficulty, setSelectedExerciseDifficulty] = useState("");
  const [selectedExerciseEquipment, setSelectedExerciseEquipment] = useState("");

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

    const selectedExerciseData = apiDataList.find((exercise) => exercise.name === selectedExercise);
    if (selectedExerciseData) {
      setSelectedExerciseInstructions(selectedExerciseData.instructions);
      setSelectedExerciseDifficulty(selectedExerciseData.difficulty);
      setSelectedExerciseEquipment(selectedExerciseData.equipment);
    } else {
      setSelectedExerciseInstructions("");
      setSelectedExerciseDifficulty("");
      setSelectedExerciseEquipment("");
    }
    setWorkoutSelected(selectedExercises.size > 0);
  };

  const beginWorkout = () => {
    setWorkoutStarted(true);
    setWorkoutSelected(false);
    setWorkoutInProgress(false);
  };

  const [addWorkout] = useMutation(ADD_WORKOUT, {
    update(cache, { data }) {
      const existingUserData = cache.readQuery({ query: QUERY_ME });

      // Create the new workout object
      const newWorkout = {
        date: new Date().toISOString(),
        exercises: savedWorkouts.map((exercise) => ({
          name: exercise.exerciseName,
          sets: [{ reps, weight }], // Assuming you save only one set here
        })),
      };

      const formattedExercises = savedWorkouts.map((exercise) => ({
        name: exercise.exerciseName,
        sets: [{ reps: exercise.reps, weight: exercise.weight }],
      }));

      const updatedUserData = {
        ...existingUserData.me,
        workouts: [...existingUserData.me.workouts, newWorkout],
      };

      cache.writeQuery({
        query: QUERY_ME,
        data: { me: updatedUserData },
      });
    },
  });

  const saveWorkoutToDatabase = async () => {
    try {
      // Convert reps and weight to integers
      const formattedExercises = savedWorkouts.map((exercise) => ({
        name: exercise.exerciseName,
        sets: exercise.sets.map((set) => ({
          reps: parseInt(set.reps, 10), // Convert to integer
          weight: parseInt(set.weight, 10), // Convert to integer
        })),
      }));

      const { data, errors } = await addWorkout({
        variables: {
          exercises: formattedExercises,
        },
        update(cache, { data }) {
          try {
            const existingUserData = cache.readQuery({ query: QUERY_ME });
            const newWorkout = {
              date: new Date().toISOString(),
              exercises: formattedExercises,
            };
            const updatedUserData = {
              ...existingUserData.me,
              workouts: [...existingUserData.me.workouts, newWorkout],
            };
            cache.writeQuery({
              query: QUERY_ME,
              data: { me: updatedUserData },
            });
          } catch (error) {
            console.error("Error updating cache:", error);
          }
        },
      });

      console.log("Workout saved:", data);
      console.log("Workout has been saved to the database.");
    } catch (error) {
      console.error("Error saving workout:", error);
    }
  };

  const finishWorkout = async () => {
    setWorkoutInProgress(false);
    setSavedWorkouts([]);
    setWorkoutStarted(false);
    setSelectedExerciseOption("");
    setSets(0);
    setReps(0);
    setWeight(0);
    setModalShow(true);

    await saveWorkoutToDatabase();
  };

  const exerciseArray = savedWorkouts.map((exercise) => ({
    name: exercise.exerciseName,
    sets: exercise.sets,
    reps: exercise.reps,
    weight: exercise.weight,
  }));

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
      sets: [{ reps, weight }],
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
      <div className="card d-flex justify-content-center text-center">
        <h2 className="mt-5 mb-5">{exerciseName}</h2>
        <div className="m-2">
          <label className="me-3">Sets: </label>
          <input type="number" value={sets} onChange={handleSetsChange} min={0} />
        </div>
        <div className="m-2">
          <label className="me-3">Reps: </label>
          <input type="number" value={reps} onChange={handleRepsChange} min={0} />
        </div>
        <div className="m-2">
          <label className="me-2">Weight: </label>
          <input type="number" value={weight} onChange={handleWeightChange} min={0} />
        </div>
        <div>
          <button className="btn btn-primary mt-5 mb-5" onClick={saveExercise}>
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
    <div className="notHome">
      <div>
        <h1 className="text-center">Begin Your Workout</h1>
      </div>
      <div className="d-flex flex-row align-items-center">
        {!workoutStarted && (
          <section id="workoutSelection" className="mt-5 col-6 p-2">
            {modalShow && <RatingModal show={modalShow} onHide={() => setModalShow(false)} />}
            <div className="card">
              <div className="dropdown-center card-body text-center">
                <button
                  className="btn dropdown-toggle m-1"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {selectedType.toUpperCase() ? selectedType.toUpperCase() : "Select"}
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
                <div className="dropdown-center card-body text-center">
                  <button
                    className="btn dropdown-toggle m-1"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {selectedOption.toUpperCase() ? selectedOption.toUpperCase() : "Select"}
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
                </div>
              )}

              {selectedOption && (
                <div className="card-body">
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
                        <label className="form-check-label ms-2">{exercise.name}</label>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}

        <div className="exerciseTracker col-6 mt-5">
          <div>
            {workoutSelected && selectedExerciseOption && (
              <div class="card text-center mb-3 exerciseInfo">
                <div class="card-body">
                  <h3 class="card-title p-2">{selectedExerciseOption}</h3>
                  <div>
                    <p class="card-text p-2">
                      <strong>Difficulty:</strong> {selectedExerciseDifficulty.toUpperCase()}
                    </p>
                  </div>
                  <div>
                    <p class="card-text p-2">
                      <strong>Equipment:</strong> {selectedExerciseEquipment.toUpperCase()}
                    </p>
                  </div>
                  <div>
                    <p class="card-text p-2">
                      <strong>Instructions:</strong> {selectedExerciseInstructions}
                    </p>
                  </div>
                  <div className="d-flex justify-content-center p-2">
                    <button id="beginWorkout" className="mt-3 btn btn-primary d-grid gap-2" onClick={beginWorkout}>
                      Begin Workout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-5">
        <div className="card-body d-flex justify-content-center">
          {workoutInProgress && (
            <div className="exerciseContainer p-2">
              <h2 className="pb-3">Workout in Progress</h2>

              {exerciseArray.map((exercise, index) => (
                <div className="card mb-3">
                  <li key={index}>
                    <strong>Exercise: </strong>
                    {exercise.name},
                    <ul>
                      {exercise.sets.map((set, setIndex) => (
                        <li key={setIndex}>
                          <strong>Set: </strong>
                          Reps: {set.reps}, Weight: {set.weight}
                        </li>
                      ))}
                    </ul>
                  </li>
                </div>
              ))}

              <div className="p-2 text-center mt-5">
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
  );
};

export default Workouts;
