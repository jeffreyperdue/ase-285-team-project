import "../../css/styles.css";

function GenerateDietList() {
  const diets = [
    { label: "Keto",
      value: "keto"
    },
    { label: "Vegan",
      value: "vegan"
    },
    { label: "Vegetarian",
      value: "vegetarian"
    },
    { label: "Halal",
      value: "halal"
    },
    { label: "Kosher",
      value: "kosher"
    },
    { label: "Pescatarian",
      value: "pescatarian"
    }
  ]

  let dietList = [];

  for (const diet of diets) {
    dietList.push(
      <label key={ diet.value } className="diet-label">
        <input
          type="checkbox"
          name="diets"
          value={ diet.value }
          className="checkbox"
        />
        { diet.label }
      </label>
    )
  }
  
  return (
    <>{ dietList }</>
  )
}

export default GenerateDietList;