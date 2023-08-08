import React, { useState, useEffect } from "react";

const apiKey = "okHBdIqFHCmm+1cNKVgbkA==nQJoO9i4TaJ8a2Pn";
const apiURL = "https://api.api-ninjas.com/v1/exercises?";

const Workouts = () => {
  const [selectedType, setSelectedType] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [options, setOptions] = useState([]);
  const [apiDataList, setApiDataList] = useState([]);
  const [selectedExerciseOption, setSelectedExerciseOption] = useState("");

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
    const selectedExerciseOption = event.target.textContent;
    setSelectedExerciseOption([selectedExerciseOption]);
  };

  const makeApiCall = () => {
    return fetch(`${apiURL}=${selectedOption}`, {
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
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
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
            className="btn btn-secondary dropdown-toggle"
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
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {selectedExerciseOption ? selectedExerciseOption : "Select"}
              </button>
              <ul className="dropdown-menu exercises">
                {apiDataList.map((exercise, index) => (
                  <li key={index}>
                    <a className="dropdown-item" href="#" onClick={handleExerciseOptionChange}>
                      {exercise.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Workouts;
