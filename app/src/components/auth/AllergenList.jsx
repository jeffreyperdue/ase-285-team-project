function GenerateAllergenList() {
  const allergens = [
    { label: "Lactose (milk)",
      value: "lactose"
    },
    { label: "Gluten",
      value: "gluten"
    },
    { label: "Meat",
      value: "meat"
    },
    { label: "Fish",
      value: "fish"
    },
    { label: "Animal Products",
      value: "animalProducts"
    },
    { label: "Eggs",
      value: "eggs"
    },
    { label: "Shellfish",
      value: "shellfish"
    },
    { label: "Tree Nuts",
      value: "treeNuts"
    },
    { label: "Peanuts",
      value: "peanuts"
    }
  ]

  let allergenList = [];

  for (const allergen of allergens) {
    allergenList.push(
      <div className="checkbox-container">
        <label className="allergen-label">
          <input
            type="checkbox"
            name="allergens"
            value={ allergen.value }
          />
          { allergen.label }
        </label>
      </div>
    )
  }
  
  return (
    <>{ allergenList }</>
  )
}

export default GenerateAllergenList;