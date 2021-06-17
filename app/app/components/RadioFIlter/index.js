import React from "react"
const RadioFilters = ({
    name,
    filters,
    limit,
    view,
    handleModal,
    check,
    subkey,
    checked,
    onClick,
    ...props
}) => {
    return (
        <div>

            {filters.slice(0, limit).map((i, ind) => {
                return (
                    <div>

                        <label check>
                            <input
                                type="radio"
                                name={checked}
                                id={i._id}
                                key={i._id}
                                value={i._id}
                                checked={checked && i._id === checked ? true : false}
                                onClick={e => onClick(e, i, name, subkey)}
                                {...props}
                            />
                            {i.name}
                        </label>
                    </div>
                )
            })}
        </div>
    )
}

export default RadioFilters
