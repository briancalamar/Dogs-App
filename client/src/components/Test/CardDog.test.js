/* eslint-disable jest/valid-expect */
import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CardDog from '../CardDog'

test('Render first Card Dog', () => {

    const { getByText } = render(
        <CardDog
            id={1}
            name={"Scooby"}
            temperaments={["Funny", "Crazy"]}
            image={undefined}
        />)
    expect(getByText((content, element) => {
        return element.tagName.toLowerCase() === 'h2' && content.startsWith('Scooby')
    }))
    expect(getByText((content, element) => {
        return element.tagName.toLowerCase() === 'li' && content.startsWith('Funny')
    }))
    expect(getByText((content, element) => {
        return element.tagName.toLowerCase() === 'li' && content.startsWith('Crazy')
    }))
})

test('Render CardDog', () => {

    const { getByText } = render(
        <CardDog
            id={1}
            name={"Brian PI"}
            temperaments={["Nervioso", "Crazy"]}
            image={undefined}
        />)
    expect(getByText((content, element) => {
        return element.tagName.toLowerCase() === 'h2' && content.startsWith('Brian')
    }))
    expect(getByText((content, element) => {
        return element.tagName.toLowerCase() === 'li' && content.startsWith('Nervioso')
    }))
    expect(getByText((content, element) => {
        return element.tagName.toLowerCase() === 'li' && content.startsWith('Crazy')
    }))
})