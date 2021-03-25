import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({title, description, keywords}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' />{description}
            <meta name='keywords' />{keywords}
        </Helmet>
    )
}

Meta.defaultProps = {
    title: 'Welcome to the Purplish Store',
    description: 'Best online store',
    keywords: 'electronics, buy electronics, cheap',
}

export default Meta
