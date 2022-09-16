import { useState, useRef, useEffect, useContext } from "react"
import { UserContext } from "../../context"
import { Alert } from "../../utils/Alerts"
import styles from "../../styles/Company.module.css"

const support = () => {
    return (
        <div className={styles.aboutWrapper}>
            <span className={styles.bg}>
                <span className={styles.title}>Support</span>
            </span>
        </div>
    )
}

export default support