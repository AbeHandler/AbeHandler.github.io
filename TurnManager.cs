using UnityEngine;
using UnityEngine.InputSystem; // Reference the new Input System namespace

public class TurnManager : MonoBehaviour
{

    public DataLoader dataLoader; // Reference to the DataLoader component

    private KeyPadInputManager keyPadInputManager;

    private InputAction turnAction; // Define an InputAction for detecting turn changes

    private AudioSource[] audioSources;
    private AudioSource primaryAudioSource;
    private AudioSource secondaryAudioSource;


    void Awake()
    {
        // Create a new InputAction for the "T" key
        turnAction = new InputAction(binding: "<Keyboard>/t");
        Debug.Log("TurnManager Awake");
        turnAction.performed += ctx => IncreaseTurn(); // Register a callback for when the action is performed
        turnAction.Enable(); // Enable the action

        audioSources = GetComponents<AudioSource>();

        // Assign references to your AudioSource variables
        primaryAudioSource = audioSources[0]; // Assuming the first one is the primary
        secondaryAudioSource = audioSources[1]; // Assuming the second one is the secondary

        // Subscribe to the DataLoader's event
        if (dataLoader != null)
        {
            dataLoader.onDataProcessed.AddListener(UpdateScale);
        }
        else
        {
            Debug.LogError("DataLoader reference not set in TurnManager.");
        }

        GameObject keyPadObject = GameObject.Find("WorldBuilder");

        if (keyPadObject != null)
        {
            // Get the KeyPadInputManager component from the GameObject
            keyPadInputManager = keyPadObject.GetComponent<KeyPadInputManager>();

            if (keyPadInputManager != null)
            {
                // Now you can call the ResetNumber method
                keyPadInputManager.ResetNumber();
            }
            else
            {
                Debug.LogError("KeyPadInputManager component not found on the GameObject.");
            }
        }
        else
        {
            Debug.LogError("GameObject with KeyPadInputManager not found in the scene.");
        }
        IncreaseTurn();
    }


    public void IncreaseTurn()
    {
        GlobalVariables.turn++; // Increment the turn count
        // Notify DataLoader to fetch data for the new turn
        if (dataLoader != null)
        {
            int randomNumber = Random.Range(0, 101); // they see a random graph each turn
            Debug.Log("Fetching data for turn: " + GlobalVariables.turn);
            GlobalVariables.dataset = randomNumber;
            Debug.Log("Turn: " + GlobalVariables.turn);
            int flipPoint = GlobalVariables.maxturn / 2;
            Debug.Log("Flip Point: " + flipPoint);
            if (GlobalVariables.turn == flipPoint)
            {
                GlobalVariables.ClevelandMode = !GlobalVariables.ClevelandMode;
                secondaryAudioSource.Play();
            }
            keyPadInputManager.ResetNumber();
            dataLoader.FetchDataForTurn(randomNumber);
        }
        else
        {
            Debug.LogError("DataLoader reference not set in TurnManager.");
        }
    }

    void UpdateScale()
    {

        // Instead of finding "mygraph", find the GameObject with the Graph2 component
        Graph2 graphComponent = FindObjectOfType<Graph2>(); // This finds any active GameObject with the Graph2 component

        // Call the step method on the Graph2 component
        if (graphComponent != null) // Check if Graph2 component is found
        {
            graphComponent.step();
        }
        else
        {
            Debug.LogError("Graph2 component not found in the scene.");
        }

    }


    void AlignLeftEdges()
    {
        GameObject TopBar = GameObject.Find("TopBar");
        GameObject BottomBar = GameObject.Find("BottomBar");
        float marginTop = (1 - TopBar.transform.localScale.z) / 2;
        float marginBottom = (1 - BottomBar.transform.localScale.z) / 2;

        // reset position to zero
        TopBar.transform.localPosition = new Vector3(TopBar.transform.localPosition.x,
                                                     TopBar.transform.localPosition.y,
                                                     0);
        BottomBar.transform.localPosition = new Vector3(BottomBar.transform.localPosition.x,
                                                        BottomBar.transform.localPosition.y,
                                                        0);

        // then reset to correct position/
        //
        //  | margin | top. bar z | margin |
        //  | margin | bot. bar z | margin |
        //
        // so delete margin

        TopBar.transform.localPosition = new Vector3(TopBar.transform.localPosition.x,
                                                     TopBar.transform.localPosition.y,
                                                     TopBar.transform.localPosition.z - marginTop);
        BottomBar.transform.localPosition = new Vector3(BottomBar.transform.localPosition.x,
                                                        BottomBar.transform.localPosition.y,
                                                        BottomBar.transform.localPosition.z - marginBottom);
        Debug.Log("MarginTop: " + marginTop);
        Debug.Log("MarginBottom: " + marginBottom);
    }


    void OnDestroy()
    {
        // Unsubscribe from the DataLoader's event to prevent memory leaks
        if (dataLoader != null)
        {
            dataLoader.onDataProcessed.RemoveListener(UpdateScale);
        }

        if (turnAction != null)
        {
            turnAction.Disable(); // Disable the action when the object is destroyed
        }
    }
}
