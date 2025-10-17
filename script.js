(async function () {
    // Constants
    const DELETION_BATCH_SIZE = 20; // Number of comments to delete in each batch
    const DELAY_BETWEEN_ACTIONS_MS = 700; // Delay between actions
    const DELAY_BETWEEN_CHECKBOX_CLICKS_MS = 100; // Delay between checkbox clicks
    const MAX_RETRIES = 60; // Maximum number of retries for waiting operations

    // Utility function to delay execution for a given amount of time
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // Utility function to wait for an element to appear in the DOM
    const waitForElement = async (tag, selector, timeout = 30000) => {
        console.log(`Waiting for ${tag} element with selector "${selector}"...`);

        const startTime = Date.now();
        while (Date.now() - startTime < timeout) {
            const element = Array.from(document.querySelectorAll(tag)).find(
                (el) => el.textContent.trim() === selector
            );
            if (element) {
                console.log(`Found ${tag} element with selector "${selector}"`);
                return element;
            }
            await delay(100);
        }

        throw new Error(`Element with selector "${selector}" not found within ${timeout}ms`);
    };

    // Utility function to click an element
    const clickElement = async (element) => {
        if (!element) throw new Error('Element not found');
        element.click();
    };

    // Deletes the selected comments
    const deleteSelectedComments = async () => {
        try {
            const deleteButton = await waitForElement('span', 'Delete'); // Adjusted if needed
            await clickElement(deleteButton);
            await delay(DELAY_BETWEEN_ACTIONS_MS);

            const confirmButton = await waitForElement('button', 'Delete');
            await clickElement(confirmButton);

            await delay(5000); // Wait for the deletion to process

            // Handle Instagram's error dialog (adjust if necessary)
            const okButton = await waitForElement('button', 'OK', 10000);
            await clickElement(okButton);

            console.log('Deleted selected comments');
        } catch (error) {
            console.error('Error during comment deletion:', error.message);
        }
    };

    // Deletes all user comments in batches
    const deleteActivity = async () => {
        try {
            console.log('Starting deletion process...');
            const selectButton = await waitForElement('span', 'Select'); // Adjusted if needed
            if (!selectButton) throw new Error('Select button not found');

            await clickElement(selectButton);
            await delay(DELAY_BETWEEN_ACTIONS_MS);

            // Find checkboxes for the comments
            const checkboxes = document.querySelectorAll('[aria-label="Toggle checkbox"]'); // Ensure this selector is still correct
            if (checkboxes.length === 0) {
                console.log('No comments to delete... retrying after delay');
                await delay(DELAY_BETWEEN_ACTIONS_MS);
                return deleteActivity(); // Retry
            }

            // Loop through checkboxes and select them in batches
            for (let i = 0; i < Math.min(DELETION_BATCH_SIZE, checkboxes.length); i++) {
                await clickElement(checkboxes[i]);
                await delay(DELAY_BETWEEN_CHECKBOX_CLICKS_MS);
            }

            await delay(DELAY_BETWEEN_ACTIONS_MS);
            await deleteSelectedComments();

            // Recursively call deleteActivity to continue with the next batch
            await deleteActivity(); // Make this recursive until all comments are deleted
        } catch (error) {
            console.error('Error in deleteActivity:', error.message);
        }
    };

    // Start the deletion process
    try {
        await deleteActivity();
    } catch (error) {
        console.error('Fatal error:', error.message);
    }
})();
